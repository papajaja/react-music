import { useEffect, useRef, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import SpotifyService from "../services/SpotifyService";
import CurrentUser from "../store/CurrentUser";
import { observer } from "mobx-react";
import AuthService from "../services/AuthService";
import { Link, useLocation, useParams } from "react-router-dom";
import HeadBarSettings from "./HeadBarSettings";
import MyInput from "./MyInput";

const HeadBar = observer(() => {
  const params = useParams();
  const [isSettings, setSettings] = useState(false);
  const btnRef = useRef();
  const [fetchProfile, isLoaded, error] = useFetching(async () => {
    const response = await SpotifyService.getProfile();
    const id = response.data.id;
    const name = response.data.display_name;
    const image = response.data.images.length > 0 ? response.data.images[0].url : "";
    AuthService.setUser(id, name, image);
  });

  useEffect(() => {
    fetchProfile();
  }, [params]);

  const switchSettings = (event) => {
    setSettings((i) => !i);
  };

  return (
    <>
      {isSettings && <HeadBarSettings btnRef={btnRef} setActive={setSettings}></HeadBarSettings>}
      <header className="headbarcontainer">
        <div className="headbar">
          {!error ? (
            isLoaded && (
              <div className="headbar_curr_user">
                <div className="headbar_username">{CurrentUser.name || "none"}</div>
                <div ref={btnRef} onClick={switchSettings} className="headbar_image">
                  {CurrentUser.image ? (
                    <img src={CurrentUser.image} alt="" />
                  ) : (
                    <div className="headbar_plug"></div>
                  )}
                </div>
              </div>
            )
          ) : (
            <Link className="headbar_login" to={"../../../login"}>
              Войти
            </Link>
          )}
        </div>
      </header>
    </>
  );
});

export default HeadBar;
