




// src/components/ProfileModals.jsx


import React from "react";
import Button from "../components/buttons/button"; 

function ProfileModals({ 
    showAvatarModal, setShowAvatarModal, avatarUrl, setAvatarUrl, handleAvatarUpdate, 
    showBannerModal, setShowBannerModal, bannerUrl, setBannerUrl, handleBannerUpdate 
}) {
    return (
        <>
            {/* Avatar modal */}
            {showAvatarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-modal-button" onClick={() => setShowAvatarModal(false)}>❌</button>
                        <h3>Update Avatar</h3>
                        <input
                            type="text"
                            placeholder="Enter new avatar URL"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            className="avatar-input"
                        />
                        <Button onClick={handleAvatarUpdate} variant="button">Update Avatar</Button>
                    </div>
                </div>
            )}




            {/* Banner modal */}
            {showBannerModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-modal-button" onClick={() => setShowBannerModal(false)}>❌</button>
                        <h3>Update Banner</h3>
                        <input
                            type="text"
                            placeholder="Enter new banner URL"
                            value={bannerUrl}
                            onChange={(e) => setBannerUrl(e.target.value)}
                            className="banner-input"
                        />
                        <Button onClick={handleBannerUpdate} variant="button">Update Banner</Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileModals;
