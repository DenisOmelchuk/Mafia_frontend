import logo from "./logo.png";
import RegisterLoginHeader from "./RegisterLoginHeader";

export default function RegisterLoginContainer(props) {
  return (
    <>
      <div className="reg_log">
        <div className="create_page_container">
          <div className="login_register_image_form_container">
            <img src={logo} alt="" className="heisengerg_img" />
            <div className="form_container">
              <div className="create_game_form_container_pararaph_container">
                <RegisterLoginHeader />
              </div>
              <hr className="custom-hr_register_login" id="register_login_hr"/>
              {props.children}
            </div>
          </div>
        </div>
      </div>
      );
    </>
  );
}
