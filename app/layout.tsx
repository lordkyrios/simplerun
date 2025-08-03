body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #e6e6e6;
  color: #333;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
}

.header {
  text-align: center;
  background: linear-gradient(90deg, #800020, #990000); /* Burgundy gradient */
  color: white;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
}

.header h2 {
  margin: 5px 0;
  font-size: 1.8rem;
}

.header .subtitle {
  font-size: 1.3rem;
  margin-top: 10px;
  font-weight: bold;
  color: #f7f7f7;
}

.main-layout {
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 20px;
  width: 100%;
}

.controls {
  flex: 1;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.controls label {
  font-weight: bold;
}

.controls textarea {
  width: 100%;
  height: 120px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.controls select,
.controls input[type="text"],
.controls input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.render-btn,
.preview-btn,
.upload-btn,
.apply-btn {
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
}

.render-btn {
  background: #007bff;
  color: white;
}

.preview-btn {
  background: #28a745;
  color: white;
}

.upload-btn {
  background: #ff9800;
  color: white;
}

.apply-btn {
  background: #673ab7;
  color: white;
}

.preview-btn:hover,
.render-btn:hover,
.upload-btn:hover,
.apply-btn:hover {
  opacity: 0.9;
}

.video-preview {
  flex: 1.2;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.video-preview h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.preview-box {
  background: #d9d9d9;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #555;
  font-style: italic;
}

@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
  }
}
