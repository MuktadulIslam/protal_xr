export default function LoadingScreen({ message }: { message: string }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {message}
                    </h3>
                    <p className="text-gray-600 mt-1">Please wait...</p>
                </div>
            </div>
        </div>
    )
}