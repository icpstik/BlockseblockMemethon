let Reset = {
  reset(){
    this.changeResetModalStatus('none')
    Load.found = false
    Clicks.onload()
    Autoclickers.onload()
    Runtime.onload()
    Reset.resetElements()
  },

  changeResetModalStatus(status){
    document.getElementById("resetModal").style.display = status;
  },

  checkReset(){
    this.changeResetModalStatus('block')
  },

  noReset(){
    this.changeResetModalStatus('none')
  }
}