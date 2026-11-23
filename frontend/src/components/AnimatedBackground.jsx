export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 top-10 left-10 animate-pulse"></div>

      <div className="absolute w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-pulse"></div>
    </div>
  )
}