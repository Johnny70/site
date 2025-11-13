let vantaEffect = null;
document.addEventListener("DOMContentLoaded", function() {
  if (window.VANTA && typeof window.VANTA.CELLS === "function") {
VANTA.CELLS({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  color1: 0x143578,
  color2: 0xa6b8f5,
  size: 5.00,
  speed: 0.60
})
    // Parallax scroll: flytta canvas uppåt vid scroll
    window.addEventListener('scroll', function() {
      const vantaBg = document.getElementById('vanta-bg');
      if (vantaBg) {
        const extraHeight = vantaBg.offsetHeight - window.innerHeight;
        let y = window.scrollY * -0.2;
        // Begränsa så att canvas aldrig rör sig mer än extra höjd
        y = Math.max(-extraHeight, y);
        vantaBg.style.transform = `translateY(${y}px)`;
      }
    });
  } else {
    console.error("VANTA.FOG is not available. Check that the scripts are loaded correctly.");
  }
});
