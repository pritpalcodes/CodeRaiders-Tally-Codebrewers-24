
function Footer() {
    return (
      <footer className="bg-[#f8f8f8] text-[#666666] py-4 text-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
          <span className="block">&copy; 2024 LeetCode</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Bug Bounty</a>
            <a href="#" className="hover:underline">Students</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
          <div className="flex items-center">
            <img src="../assets/download.png" alt="US Flag" className="w-5 h-5" />
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;