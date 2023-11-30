
import { Button } from "./ui/button";


type GoogleSignInButtontype = {
    children: React.ReactNode
}

const GoogleSignInButton: React.FC<GoogleSignInButtontype> = ({ children }) => {

    const loginWithGoogle = () => {
        console.log('log in button')
    }
    return (
        <Button onClick={loginWithGoogle}
            className="w-full">{children}</Button>
    );
};

export default GoogleSignInButton;