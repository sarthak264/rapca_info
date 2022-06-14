import sampleVideo from "assets/videos/sample.mp4";

export const appLogo = require("../assets/images/logo.png");

export const Url = "https://api.3.108.0.123.nip.io/";
// export const Url = process.env.REACT_APP_BASE_URL;

const size = {
  mobileS: "321px",
  mobileM: "376px",
  mobileL: "426px",
  tablet: "768px",
  laptop: "1025px",
  laptopL: "1441px",
  desktop: "2561px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

export const videos = [
  "https://assignment-prod.s3.ap-south-1.amazonaws.com/data/LandingPageVideos/WhyPractWorks_New.mp4",
  "https://assignment-prod.s3.ap-south-1.amazonaws.com/data/LandingPageVideos/Ver2Deliberate+practicing.mp4",
  "https://assignment-prod.s3.ap-south-1.amazonaws.com/data/LandingPageVideos/WorkBookVsPractWorks.mp4",
  "https://assignment-prod.s3.ap-south-1.amazonaws.com/data/LandingPageVideos/TutionVsPractWorks.mp4",
  "https://assignment-prod.s3.ap-south-1.amazonaws.com/data/LandingPageVideos/SmartStudentsAndPractWorks.mp4",
];
