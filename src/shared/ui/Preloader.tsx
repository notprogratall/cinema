import PreloaderIcon from "./PreloaderIcon";


export const Preloader = () => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
            <div className="relative w-24 h-24 m-8">
                <PreloaderIcon className="w-full h-full text-gray-700 dark:text-gray-200" />
            </div>
        </div>
    );
};
