var Buttonconfig = {
  buttonsManual: {mouseR:10, mouseE:300},
  
  show(){
    for (const [key, value] of Object.entries(this.buttonsManual)){
      if (Clicks.nbrOwned >= value){
        document.getElementById(String(key)).style = 'visibility:visible'
      }
    }
  },
  
  hide(){
    for (const [key, value] of Object.entries(this.buttonsManual)){
      document.getElementById(String(key)).style = 'visibility:hidden'
    }
  },
  
  enable(){
    for (const [key, value] of Object.entries(this.buttonsManual)){
      if (Clicks.nbrOwned >= value){
        document.getElementById(String(key)).disabled = ''
      } else {
        break
      }
    }
  }
}
