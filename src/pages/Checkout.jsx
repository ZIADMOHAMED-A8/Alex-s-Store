import React, { useLayoutEffect, useState } from 'react';
import { ChevronDown, Zap, Shield, Clock, Upload, X } from 'lucide-react';
import styles from './checkout.module.css';
import { useGetDataQuery } from '../../dataslice';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Checkout() {
  const [selectedGame, setSelectedGame] = useState();
  const [playerId, setPlayerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transferImage, setTransferImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sendingLoading, setsendingLoading] = useState(false);

  let { data, isLoading } = useGetDataQuery();
  let nav = useNavigate();
  let paramsData = useParams();

  useLayoutEffect(() => {
    setSelectedGame(+paramsData.gameIndex);
    setSelectedPackage(+paramsData.packIndex);
  }, []);

  // 🔄 تحويل أي صورة إلى JPEG
  const convertToJpeg = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(
              new File(
                [blob],
                file.name.replace(/\.\w+$/, ".jpg"),
                { type: "image/jpeg" }
              )
            );
          }, "image/jpeg", 0.9);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("الصورة كبيرة جدًا (أكتر من 10MB)");
        return;
      }

      const jpegFile = await convertToJpeg(file);
      setTransferImage(jpegFile);

      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(jpegFile);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setTransferImage(null);
    setImagePreview(null);
  };

  function sendData() {
    const botToken = 'PUT-YOUR-BOT-TOKEN-HERE';
    const chatId = 'PUT-YOUR-CHAT-ID-HERE';

    let caption = `Game: ${data.games[selectedGame].game_name}
type: ${data.games[selectedGame].account_type}
player ID: ${playerId}
phone number: ${phoneNumber}
package: ${data.games[selectedGame].packages[selectedPackage].quantity}
price: ${data.games[selectedGame].packages[selectedPackage].price_egp} EGP`;

    if (
      (selectedGame || selectedGame === 0) &&
      (selectedPackage || selectedPackage === 0) &&
      phoneNumber &&
      transferImage
    ) {
      setsendingLoading(true);

      const formData = new FormData();
      formData.append("chat_id", chatId);
      formData.append("photo", transferImage);
      formData.append("caption", caption);

      fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Telegram response:", data);
          setsendingLoading(false);
          toast.success("استلمنا طلبك وبنراجعه في أسرع وقت");
          setTimeout(() => nav("/"), 2000);
        })
        .catch((err) => {
          console.error("Error sending to Telegram:", err);
          setsendingLoading(false);
          toast.error("في مشكلة في رفع الصورة");
        });
    } else {
      toast.error("حط كل المعلومات");
    }
  }

  if (isLoading) {
    return <p>loading</p>;
  } else {
    return (
      <>
        <div className={styles.container}>
          <h1>
            حول هنا {data.contact.phone} {data.contact.type}
            و حط رقم عليه واتساب عشان نكلمك
          </h1>
        </div>

        <div className={styles.container}>
          <div className={styles.checkoutSection}>
            <h1 className={styles.title}>Checkout</h1>
            <p className={styles.subtitle}>
              Fast delivery and 24/7 support on every order.
            </p>

            <div className={styles.formSection}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Choose Game</label>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.select}
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                  >
                    <option value="">Select a game</option>
                    {data.games.map((item, index) => (
                      <option key={index} value={index}>
                        {item.game_name} / {item.account_type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={styles.chevron} size={20} />
                </div>
              </div>

              {data.games[selectedGame]?.account_type === "ID" && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Player ID</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter your player ID"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Select Package</label>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.select}
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                  >
                    <option value="">Choose a bundle</option>
                    {(selectedGame || selectedGame === 0) &&
                      data.games[selectedGame].packages.map((item, index) => (
                        <option key={index} value={index}>
                          {item.quantity}
                        </option>
                      ))}
                  </select>
                  <ChevronDown className={styles.chevron} size={20} />
                </div>
              </div>

              {/* Image Upload Field */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Upload Transfer Screenshot</label>
                <div className={styles.imageUploadSection}>
                  {!imagePreview ? (
                    <div className={styles.uploadArea}>
                      <input
                        type="file"
                        id="transferImage"
                        className={styles.fileInput}
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="transferImage" className={styles.uploadLabel}>
                        <Upload className={styles.uploadIcon} size={24} />
                        <span className={styles.uploadText}>
                          Click to upload transfer screenshot
                        </span>
                        <span className={styles.uploadSubtext}>
                          PNG, JPG, JPEG up to 10MB
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className={styles.imagePreview}>
                      <img
                        src={imagePreview}
                        alt="Transfer Screenshot"
                        className={styles.previewImage}
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className={styles.removeImageBtn}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.deliveryInfo}>
                <Zap className={styles.deliveryIcon} size={16} />
                <span className={styles.deliveryText}>
                  Average delivery time: under 2 minutes.
                </span>
              </div>

              <button
                onClick={sendData}
                className={`${styles.payButton} ${
                  sendingLoading ? styles.disabled : ''
                }`}
              >
                <Shield size={20} />
                Submit Order
              </button>
            </div>
          </div>

          <div className={styles.summarySection}>
            <div className={styles.orderSummary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Game</span>
                <span className={styles.summaryValue}>
                  {(selectedGame || selectedGame === 0)
                    ? data.games[selectedGame].game_name
                    : "—"}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Package</span>
                <span className={styles.summaryValue}>
                  {(selectedPackage || selectedPackage === 0) &&
                  (selectedGame || selectedGame === 0)
                    ? data.games[selectedGame].packages[selectedPackage].quantity
                    : "—"}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Subtotal</span>
                <span className={styles.summaryValue}>
                  {(selectedPackage || selectedPackage === 0) &&
                  (selectedGame || selectedGame === 0)
                    ? `${data.games[selectedGame].packages[selectedPackage].price_egp} EGP`
                    : "EGP0.00"}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Fees</span>
                <span className={styles.summaryValue}>0.00 EGP</span>
              </div>

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span className={styles.summaryLabel}>Total</span>
                <span className={styles.summaryValue}>
                  {(selectedPackage || selectedPackage === 0) &&
                  (selectedGame || selectedGame === 0)
                    ? `${data.games[selectedGame].packages[selectedPackage].price_egp} EGP`
                    : "EGP0.00"}
                </span>
              </div>

              <div className={styles.features}>
                <div className={styles.feature}>
                  <Zap className={styles.featureIcon} size={16} />
                  <div className={styles.featureContent}>
                    <div className={styles.featureTitle}>Lightning Fast</div>
                    <div className={styles.featureDesc}>
                      Orders are processed instantly
                    </div>
                  </div>
                </div>

                <div className={styles.feature}>
                  <Shield className={styles.featureIcon} size={16} />
                  <div className={styles.featureContent}>
                    <div className={styles.featureTitle}>
                      Secure encrypted payments
                    </div>
                    <div className={styles.featureDesc}>with SSL protection</div>
                  </div>
                </div>

                <div className={styles.feature}>
                  <Clock className={styles.featureIcon} size={16} />
                  <div className={styles.featureContent}>
                    <div className={styles.featureTitle}>24/7 Support</div>
                    <div className={styles.featureDesc}>
                      Always here when you need help.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Checkout;
