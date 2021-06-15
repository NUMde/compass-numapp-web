import { Component, h, State } from '@stencil/core';
import jsQR from 'jsqr';
import { Card } from 'components/card/card';
import { APP_NAME, QR_PROP_APP_NAME, QR_PROP_USER_ID, ROUTES, SUPPORT_QR_CODE } from 'global/constants';
import services from 'services';
import store from 'store';
import { ResponseError } from 'services/utils/response-error';

@Component({
  tag: 'num-container-authenticate',
  styleUrl: 'authenticate.css',
})
export class Authenticate {
  #captureAnimationFrame?: number;
  #stream?: MediaStream;
  #videoEl?: HTMLVideoElement;
  #canvasEl?: HTMLCanvasElement;
  #userId: string = '';

  @State() showCamera: boolean = false;
  @State() isAuthenticating: boolean = false;

  handleSubmit(event: Event) {
    event.preventDefault();
    this.authenticate();
  }

  get supportsCamera() {
    try {
      return SUPPORT_QR_CODE && !!navigator.mediaDevices.getUserMedia;
    } catch (e) {
      return false;
    }
  }

  async authenticate() {
    const userId = this.#userId.replace(/[^\d\w-+*.#]/g, '');

    this.isAuthenticating = true;

    this.showCamera = false;
    this.stopCamera();

    try {
      const userResponse = await services.user.fetch(userId);
      if (userResponse.study_id !== userId) {
        throw new ResponseError('authenticate.error.user_id_mismatch', 401);
      }

      store.user.populateFromUserResponse(userResponse);
      store.auth.login(userId);
    } catch ({ status = 0 }) {
      services.notifier.onError(`authenticate.error.code_${status}`);
      this.isAuthenticating = false;
      status === 401 && this.startCamera();
    }
  }

  async getCameraStream(): Promise<MediaStream> {
    if (!this.supportsCamera) {
      throw new Error('authenticate.error.camera_not_supported');
    }

    try {
      this.#stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });

      return this.#stream;
    } catch (e) {
      console.error(e.message);
      throw new Error('authenticate.error.camera_rejected');
    }
  }

  processQrCode(data) {
    try {
      const { [QR_PROP_APP_NAME]: appName, [QR_PROP_USER_ID]: userId } = JSON.parse(data);

      if (!appName || !userId) {
        throw new Error('authenticate.error.qr_format');
      }

      if (appName !== APP_NAME) {
        throw new Error('authenticate.error.qr_wrong_app');
      }

      this.#userId = userId;
      this.authenticate();
    } catch (error) {
      services.notifier.onError(
        error.message.indexOf('authenticate.') === 0 ? error.message : 'authenticate.error.qr_format'
      );
    }
  }

  async captureQrCode() {
    const video = this.#videoEl;
    const canvas = this.#canvasEl;

    if (!video?.srcObject || !canvas || !this.showCamera) {
      return;
    }

    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      this.#captureAnimationFrame = requestAnimationFrame(() => this.captureQrCode());
      return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });

    code?.data && this.processQrCode(code.data);

    this.#captureAnimationFrame = requestAnimationFrame(() => this.captureQrCode());
  }

  async startCamera() {
    if (!this.supportsCamera || !this.#videoEl) {
      return;
    }

    try {
      const stream = await this.getCameraStream();
      this.#videoEl.srcObject = stream;
      this.showCamera = true;
      this.#captureAnimationFrame = requestAnimationFrame(() => this.captureQrCode());
    } catch (e) {}
  }

  stopCamera() {
    window.cancelAnimationFrame?.(this.#captureAnimationFrame);
    this.#stream?.getTracks().forEach((track) => track.stop());
    if (this.#videoEl?.srcObject) {
      this.#videoEl.srcObject = null;
    }
  }

  disconnectedCallback() {
    this.stopCamera();
  }

  componentDidLoad() {
    this.startCamera();
  }

  render() {
    if (store.auth.isAuthenticated) {
      return <stencil-router-redirect url={ROUTES.DASHBOARD} />;
    }

    return (
      <Card headline={store.i18n.t('authenticate.headline')}>
        <p class="u-infotext">{store.i18n.t('authenticate.infotext')}</p>

        {this.supportsCamera && (
          <div class="authenticate__camera-container" style={{ display: this.showCamera ? 'block' : 'none' }}>
            <video
              class="authenticate__camera-stream"
              playsinline
              autoplay
              ref={(el) => (this.#videoEl = el)}
            />
            <span class="authenticate__camera-crosshair authenticate__camera-crosshair--top"></span>
            <span class="authenticate__camera-crosshair authenticate__camera-crosshair--bottom"></span>
            <canvas ref={(el) => (this.#canvasEl = el)} style={{ display: 'none' }}></canvas>
          </div>
        )}

        <form class="u-margin-top--large" onSubmit={(event) => this.handleSubmit(event)}>
          <d4l-input
            type="text"
            label={store.i18n.t('authenticate.input_label')}
            onInput={(event: any) => (this.#userId = event.target.value)}
            value={this.#userId}
            required
          />
          <d4l-button
            type="submit"
            classes="button--block u-margin-top--medium"
            isLoading={this.isAuthenticating}
            text={store.i18n.t('authenticate.continue')}
          />
        </form>
      </Card>
    );
  }
}
