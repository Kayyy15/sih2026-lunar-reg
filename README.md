<div align="center">

# 🌑 LUNAR-REG
**Multi-modal, Sun Angle and Scale Invariant Image Correspondence**

[![SIH 2026](https://img.shields.io/badge/Smart_India_Hackathon-2026-FF7A59?style=for-the-badge)](https://sih.gov.in)
[![Category: Software](https://img.shields.io/badge/Category-Software-45A29E?style=for-the-badge)]()
[![Status: Live Demo](https://img.shields.io/badge/Status-Live_Demo-66FCF1?style=for-the-badge)]()

*A robust computer vision pipeline for sub-pixel alignment of Chandrayaan-2 optical payloads (OHRC, TMC, IIRS) with LRO NAC reference imagery.*

</div>

---

## 🛰️ Problem Statement
Lunar image registration involves aligning source images (moving) with reference images (fixed). Our software solution addresses three critical challenges in lunar topography mapping:
* **Illumination Variation:** Changes in sun azimuth/elevation altering feature appearance.
* **Viewpoint Variation:** Geometric distortions from varying camera orientations.
* **Scale Variation:** Drastic resolution differences between high-res (OHRC) and low-res (IIRS) sensors.

**Deliverables:** A generic software solution yielding a registered product with corresponding match points and sub-pixel accuracy, evaluated via RMSE and inlier ratios.

## ⚙️ Architecture & Pipeline
1. **Preprocessing & Normalization:** CLAHE and noise filtering to normalize sensor histograms.
2. **Feature Extraction:** Detection of illumination-invariant lunar surface keypoints.
3. **Matching Engine:** Nearest-neighbor descriptor cross-matching.
4. **Outlier Rejection:** MAGSAC++ filtering to isolate true inlier correspondence points.
5. **Sub-Pixel Warping:** Polynomial transformation matrix application.
6. **Evaluation:** Uniform point distribution and RMSE calculation.

## 💻 Tech Stack
* **Frontend Demo UI:** HTML5, Tailwind CSS, Vanilla JavaScript, Chart.js, AOS.
* **Core ML Pipeline:** Python 3.10, OpenCV, NumPy, SciPy, PyTorch, scikit-image.
* **Datasets:** Chandrayaan-2 (OHRC, TMC-2, IIRS), LRO NAC, SELENE.

## 🚀 Running the Live Demo
The frontend interactive demo requires zero build steps or local servers. 

1. Clone or download this repository.
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox).
3. Use the Interactive Slider to view the sub-pixel registration output and toggle the MAGSAC match points.

## 📬 Mentors
* **Sri. Rohit Mishra** (SAC, ISRO)
* **Sri. Abdullah Suhail Ayyub Zinjani** (SAC, ISRO)
* **Sri. K Suresh** (SAC, ISRO)

---
<div align="center">
  <sub>Built with 💻 and ☕ for Smart India Hackathon 2026.</sub>
</div>
