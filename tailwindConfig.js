tailwind.config = {
    theme: {
      extend: {
        colors: {
          clifford: '#da373d',
        }
      }
    }
}

function dropdown() {
  document.querySelector("#submenu").classList.toggle("hidden");
  document.querySelector("#arrow").classList.toggle("rotate-0");
  displayPlaylists()
}
dropdown();

function openSidebar() {
  document.querySelector(".sidebar").classList.toggle("hidden");
}
