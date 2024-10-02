export const loginStyles = {
    container: "relative h-screen w-full overflow-hidden flex items-center justify-center",
    backgroundImageContainer: "absolute inset-0 animate-fadeIn",
    overlay: "absolute inset-0 bg-gradient-to-b from-black/70 to-black/70 animate-fadeIn",
    content: "relative z-10 flex flex-col items-center justify-center h-full text-white px-4",
    formContainer: "bg-black bg-opacity-60 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-md border border-white/10 animate-fadeInUp md:px-8 px-4", 
    logo: "flex justify-center mb-8",
    title: "text-3xl md:text-4xl font-bold mb-8 tracking-wide text-center",
    inputContainer: "space-y-6 mb-6 w-full",
    input: "w-full bg-transparent border-b-2 border-white/30 text-white placeholder-white/50 py-2 focus:outline-none focus:border-white transition-colors duration-300 text-lg",
    errorMessage: "text-red-400 text-sm text-center mb-4",
    buttonContainer: "mt-6",
    button: "w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-[#000225] hover:bg-[#00011c]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000112] transition-colors duration-300",
  };
  