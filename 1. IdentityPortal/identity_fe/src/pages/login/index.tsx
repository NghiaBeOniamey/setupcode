import logo from "#assets/image/Logo_FPT.png";
import backgroundImage from "#assets/image/bg-simple.jpg";
import logoUDPM from "#assets/image/logo-udpm-dark.png";
import IdentityFooter from "#components/ui/IdentityFooter";
import { buttonStyleLogin } from "#pages/login/style";
import { Button } from "antd";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "./hook/useLogin";

const Landing = () => {
  const { handleLogin, urlRedirect, isLoginProcessing } = useLogin();

  return (
    <div
      className='bg-gray-200 bg-cover h-screen'
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className='flex justify-center items-center h-[calc(100vh-64px)]'>
        <div className='card border-0'>
          <div>
            <div className='my-4 flex justify-center items-center'>
              <img src={logo} alt='Logo' className='mb-2 w-48' />
              <img src={logoUDPM} alt='Logo' className='mb-2 w-48' />
            </div>
            <div className='flex justify-center items-center flex-col'>
              <Button
                onClick={handleLogin}
                style={buttonStyleLogin}
                type='primary'
                size='large'
                className='mt-5 flex justify-center items-center'
                disabled={isLoginProcessing}
              >
                {urlRedirect === "" || isLoginProcessing ? (
                  <FcGoogle className='mr-2 animate-spin' />
                ) : (
                  <FcGoogle className='mr-2' />
                )}
                <span>Đăng nhập với Google</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <IdentityFooter />
    </div>
  );
};

export default Landing;
