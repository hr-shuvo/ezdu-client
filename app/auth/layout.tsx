

const AuthLayout = ({children}: React.ReactNode) => {
    return (
        <div className='h-full flex items-center justify-center bg-red-10'>
            {children}
        </div>
    );
};

export default AuthLayout;