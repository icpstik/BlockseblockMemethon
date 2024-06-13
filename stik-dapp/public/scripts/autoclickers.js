let Autoclickers = {
  Cpots: 0,
  OldButtons: '',
  nbrOwned: {
    'clickers': {cost:150000000000000, number: 0, cps: 0, buttonString: 'Clicker', showing: false, state: ''}
	},
    
  onload(){
    if (Load.found == true){
      for (const [key, value] of Object.entries(this.nbrOwned)){
        if (String(key) in Load.data.autoclickersdata){
	        this.nbrOwned[String(key)].number = Load.data.autoclickersdata[String(key)].number
          this.nbrOwned[String(key)].showing = Load.data.autoclickersdata[String(key)].showing
	      } else {
          this.nbrOwned[String(key)].number = 0
          this.nbrOwned[String(key)].showing = false       
				}
      }
      
	  } else {
	    for (const [key, value] of Object.entries(this.nbrOwned)){
				this.nbrOwned[String(key)].number = 0
	      this.nbrOwned[String(key)].showing = false
      }
    }
    this.updateClicksPerOneTenthSec()
		this.updateClicksPerSec()
  },
    
  addAutoClicker(id){
		if (Clicks.nbrOwned >= this.nbrOwned[id].cost){
      this.nbrOwned[id].number += 1
      Clicks.nbrOwned -= this.nbrOwned[id].cost
			document.getElementById(String(id)).title = 'Cps: ' + this.nbrOwned[id].cps + ' Own: ' + this.nbrOwned[id].number
      this.updateClicksPerOneTenthSec()
      this.updateClicksPerSec()
			main.update()
    }
  },
    
    
	updateClicksPerSec(){
  	document.getElementById('cps').innerHTML = String(abbreviate(Math.floor(this.Cpots*10))) + ' cps'
  },
    
	updateClicksPerOneTenthSec(){
    this.Cpots = 0
		for (const [key, value] of Object.entries(this.nbrOwned)){
  	  this.Cpots += ((value.cps*value.number)/10)
  	}
		this.Cpots += (this.Cpots)
  },
    
  updateButtons(){
		textstring=``
    for (const [key,value] of Object.entries(this.nbrOwned)){
      if (Clicks.nbrOwned >= value.cost){
				this.nbrOwned[String(key)].showing = true
        this.nbrOwned[String(key)].state = ''
      } else {
        this.nbrOwned[String(key)].state = 'disabled'
      }
		}
    for (const [key,value] of Object.entries(this.nbrOwned)){
      if (value.showing == true){
				textstring += `<button id='` + String(key) + `' title='Cps: ` + String(value.cps) + ` Own: ` + String(value.number) + `' style='font-family:monospace; margin:1px 0' onclick="Autoclickers.addAutoClicker('` + String(key) + `')" `+value.state+`>` + 'Buy '+value.buttonString + ' (' + abbreviate(value.cost) + 'C)' + `</button>`
        textstring += `\n\
`
      } else {
        textstring += ''
      }
    }
      
    //Allows clicking of button
    if (textstring != this.OldButtons){
      document.getElementById('buttons').innerHTML=textstring
      this.OldButtons = textstring
		}
  }   
}
