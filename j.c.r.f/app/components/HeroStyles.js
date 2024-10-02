//HeroStyles.js
export const heroStyles = {
  container: "relative h-screen w-full overflow-hidden",
  backgroundImageContainer: "absolute inset-0 animate-fadeIn",
  overlay: "absolute inset-0 bg-gradient-to-b from-black/80 to-black/80 animate-fadeIn",
  content: "relative z-10 flex flex-col items-center justify-center h-full text-white px-4",
  title: "text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-center",
  subtitle: "text-lg md:text-xl lg:text-2xl mb-2 text-center",
  separator: "h-1 bg-white my-4",
  fadeInUp: "opacity-0 animate-fadeInUp",
  growWidth: "w-0 animate-growWidth",
};