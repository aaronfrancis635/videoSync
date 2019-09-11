
// Constructor function for Person objects
function Room(site, time) {
    this.roomId = Math.random().toString(36).replace('0.', '');
    this.time = 0;
    this.users = [];
    this.site = "youtube";
    this.vId = "CULLDEMWMVk";
    this.paused = false;
  }




module.exports = Room;
