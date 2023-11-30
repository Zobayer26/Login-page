
type layoutType = {
    children: React.ReactNode
}

const AuthLayout: React.FC<layoutType> = ({ children }) => {
    return (
        <div className="bg-slate-200 p-10 rounded-md">
            {children}
        </div>
    );
};

export default AuthLayout;