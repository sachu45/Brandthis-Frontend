import { useState, type ChangeEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { AssetImage } from '../AssetImage';
import { CloseIcon } from '../icons';
import { ModalOverlay } from './ModalOverlay';

function FeedbackModal() {
  const { closeModal } = useApp();
  return (
    <ModalOverlay onClose={closeModal}>
      <button className="modal-close" onClick={closeModal} aria-label="Close feedback">
        <CloseIcon />
      </button>
      <div className="eyebrow">Share your feedback</div>
      <textarea
        className="feedback-textarea"
        placeholder="Tell us how to improve the product — ideas, feature requests, or general thoughts..."
      />
      <div className="feedback-footer">
        <div className="note">We read everything you share!</div>
        <button className="btn-purple" onClick={closeModal}>
          Submit
        </button>
      </div>
    </ModalOverlay>
  );
}

function SignInModal() {
  const { closeModal, showToast, enterApp } = useApp();

  function completeSignIn(method: string) {
    closeModal();
    showToast('Signed in with ' + method);
    enterApp();
  }

  return (
    <ModalOverlay onClose={closeModal} cardClassName="modal-card signin-modal">
      <button className="modal-close" onClick={closeModal} aria-label="Close sign in">
        <CloseIcon className="icon-sm" />
      </button>
      <h2>Sign in to continue</h2>
      <p className="signin-subtitle">Choose how you&apos;d like to sign in.</p>
      <div className="signin-options">
        <button className="signin-option" onClick={() => completeSignIn('Google')}>
          <span className="google-mark">G</span> Continue with Google
        </button>
        <button className="signin-option" onClick={() => completeSignIn('Email')}>
          <span className="mail-mark">✉</span> Continue with Email
        </button>
      </div>
      <p className="signin-terms">
        By continuing, you agree to our{' '}
        <a href="#" onClick={(event) => event.preventDefault()}>
          Terms
        </a>{' '}
        and{' '}
        <a href="#" onClick={(event) => event.preventDefault()}>
          Privacy Policy
        </a>
        .
      </p>
    </ModalOverlay>
  );
}

function CreditsModal() {
  const { closeModal, credits } = useApp();
  return (
    <ModalOverlay onClose={closeModal}>
      <button className="modal-close" onClick={closeModal} aria-label="Close credits">
        <CloseIcon />
      </button>
      <div className="credits-title">Credits</div>
      <div className="credits-sub">You are on the Free plan</div>
      <div className="credits-num">
        <span>{credits}</span>
        <span>credits left</span>
      </div>
      <button className="btn-purple btn-full" style={{ justifyContent: 'center' }}>
        Upgrade
      </button>
    </ModalOverlay>
  );
}

function ImagePickerModal() {
  const {
    closeModal,
    uploads,
    addUpload,
    fillBrief,
    showToast,
    imagePickerTab,
    setImagePickerTab,
  } = useApp();
  const [search, setSearch] = useState('');

  const visible = uploads.filter((image) =>
    image.name.toLowerCase().includes(search.toLowerCase()),
  );

  function selectImage(name: string) {
    fillBrief('Create an image using ' + name + ' from my uploads');
    closeModal();
    showToast(name + ' added to your brief');
  }

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    addUpload({ name: file.name, src: URL.createObjectURL(file) });
    setImagePickerTab('uploads');
    showToast('Upload added to Your Uploads');
  }

  return (
    <ModalOverlay onClose={closeModal} cardClassName="modal-card image-picker-modal">
      <div className="image-picker-head">
        <div>
          <h2>Add Images</h2>
          <p>Choose from your uploads or add a new image</p>
        </div>
        <button className="modal-close" onClick={closeModal} aria-label="Close image picker">
          <CloseIcon />
        </button>
      </div>
      <div className="image-picker-tabs">
        <button
          className={imagePickerTab === 'uploads' ? 'active' : undefined}
          onClick={() => setImagePickerTab('uploads')}
        >
          Your Uploads
        </button>
        <button
          className={imagePickerTab === 'new' ? 'active' : undefined}
          onClick={() => setImagePickerTab('new')}
        >
          Upload New
        </button>
      </div>

      {imagePickerTab === 'uploads' ? (
        <div>
          <input
            className="image-picker-search"
            placeholder="Search images..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="image-picker-grid">
            {visible.length ? (
              visible.map((image) => (
                <button
                  key={image.src}
                  className="picker-image"
                  onClick={() => selectImage(image.name)}
                >
                  <AssetImage src={image.src} alt={image.name} />
                  <span>{image.name}</span>
                </button>
              ))
            ) : (
              <div className="picker-empty">No uploads found.</div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <label className="picker-upload">
            <strong>Choose an image from your device</strong>
            <span>PNG, JPG, or WEBP up to 10MB</span>
            <input type="file" accept="image/*" onChange={handleUpload} />
          </label>
        </div>
      )}
    </ModalOverlay>
  );
}

/** Renders whichever modal the app state currently has open. */
export function Modals() {
  const { openModalId } = useApp();

  switch (openModalId) {
    case 'modal-feedback':
      return <FeedbackModal />;
    case 'modal-signin':
      return <SignInModal />;
    case 'modal-credits':
      return <CreditsModal />;
    case 'modal-image-picker':
      return <ImagePickerModal />;
    default:
      return null;
  }
}
