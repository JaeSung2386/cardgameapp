import "./style.css";
import { SiWordpress, SiTistory, SiGithub } from "react-icons/si";

function SocialMedia() {
  return (
    <div className="social-media">
      <ul className="social-media-desktop">
        <li>
          <a href="https://webveloper.dev/" target="_thapa">
            <SiWordpress />
          </a>
        </li>
        <li>
          <a href="https://webveloper.dev/" target="_thapa">
            <SiTistory />
          </a>
        </li>
        <li>
          <a href="https://webveloper.dev/" target="_thapa">
            <SiGithub />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SocialMedia;
