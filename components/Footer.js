import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t border-white/6 py-8 flex flex-col items-center gap-4 text-white'>
        <span className='text-sm font-black tracking-widest'>MyFans</span>
        <div className="social flex gap-6 text-xs text-white/30">
            <a href="https://twitter.com" className='hover:text-white/60 transition-colors'>Twitter</a>
            <a href="https://github.com" className='hover:text-white/60 transition-colors'>GitHub</a>
            <a href="https://instagram.com" className='hover:text-white/60 transition-colors'>Instagram</a>
            <a href="https://linkedin.com" className='hover:text-white/60 transition-colors'>LinkedIn</a>
        </div>
        <span className='text-xs text-white/18'>&copy; 2026 MyFans &middot; A crowdfunding platform </span>
    </footer>
  )
}

export default Footer