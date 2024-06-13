let Redirect = {
  redirected: false,
  variablesObject: {
    one:{variable:'nbrOwned', obj:'clicks'}
  },
  
  onload(){
    if ((Load.found == true) && ('redirectdata' in Load.data)){
      this.redirected = Load.data.redirectdata.redirected
    }
    this.redirected = false //Removing soon
    if ((this.redirected == false)){
      let urlParams = new URLSearchParams(location.search)
      let param
      for (const [key, value] of urlParams){
        if (key in this.variablesObject){
          param = this.variablesObject[key]
        
          if (param.obj == 'clicks'){
            this.updateClicks(param,value)
          } else if (param.obj == 'runtime'){
            this.updateRuntime(param,value)
          } else if (param.obj == 'animations'){
            this.updateAnimations(param,value)
          } else if (param.obj == 'autoclickers'){
            this.updateAutoclickers(param,value)
          }
        }
      }
      this.redirected = true
      this.updateScreen()
    }
  },
  
  updateClicks(param, value){
    if (Clicks[param.variable] < value){
      Clicks[param.variable] = Number(value)
    }
  },

  updateRuntime(param,value){
    if (Runtime[param.variable] < Number(value)){
      Runtime[param.variable].time = Number(value)
    }
  },

  updateAnimations(param,value){
    Animations[param.variable] = value
  },

  updateAutoclickers(param,value){
    if (Autoclickers.nbrOwned[param.variable].number < Number(value)){
      Autoclickers.nbrOwned[param.variable].number = Number(value)
      if (Number(value) > 0){
        Autoclickers.nbrOwned[param.variable].showing = true
      } else {
        Autoclickers.nbrOwned[param.variable].showing = false
      }
    }
  },

  updateScreen(){
    main.update()
    document.getElementById('mouseupgrades').innerHTML = 'Mouse Rating: '+ (Clicks.mouseUpgrades)
    document.getElementById('clickbutton').title = 'Click Me! (+' + (1*Clicks.mouseUpgrades) + ')'
    Autoclickers.updateClicksPerOneTenthSec()
    Autoclickers.updateClicksPerSec()
    Runtime.updateRun(Runtime.currentrun.time, 'currentrun')
  }
}
