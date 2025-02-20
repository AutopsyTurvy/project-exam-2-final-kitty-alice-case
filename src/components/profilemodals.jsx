




// src/components/ProfileModals.jsx


import React from "react";

function ProfileModals({ 
    showAvatarModal, setShowAvatarModal, avatarUrl, setAvatarUrl, handleAvatarUpdate, 
    showBannerModal, setShowBannerModal, bannerUrl, setBannerUrl, handleBannerUpdate 
}) {
    return (
        <>
            {/* Avatar Update Modal */}
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
                        <button onClick={handleAvatarUpdate} className="avatar-update-button">Update Avatar</button>
                    </div>
                </div>
            )}

            {/* Banner Update Modal */}
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
                        <button onClick={handleBannerUpdate} className="banner-update-button">Update Banner</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileModals;
