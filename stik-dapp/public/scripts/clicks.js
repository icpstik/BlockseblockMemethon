var Clicks = {
	nbrOwned: 0,
	mouseUpgrades: 0,
	clickLoop: 0,
	onload() {
		this.setNbrOwned(0)
		this.mouseUpgrades = 1
		document.getElementById('mouseupgrades').innerHTML = 'Mouse Rating: ' + abbreviate((this.mouseUpgrades))
		document.getElementById('animation').innerHTML = Animations[Animations.currentAnimation].animation[this.clickLoop]
		document.getElementById('clickbutton').title = 'Click Me! (+' + abbreviate((1 * this.mouseUpgrades)) + ')'
	},

	setNbrOwned(value) {
		this.nbrOwned = Number(value)
		document.getElementById('clicks').innerHTML = 'Taps: ' + abbreviate(Math.floor(value))
	},

	addClick() {
		if (this.nbrOwned < 1000000) {
			this.setNbrOwned(this.nbrOwned + (1 * this.mouseUpgrades))
			this.clickLoop += 1
			if (this.clickLoop > (Animations[Animations.currentAnimation].animation.length - 1)) {
				this.clickLoop = 0
			}
			document.getElementById('animation').innerHTML = Animations[Animations.currentAnimation].animation[this.clickLoop]
			const preElement = document.getElementById('animation');
			colorizeString(preElement);
			main.update()
		} else {
			alert("max 1,000,000 taps per run");
		}
	},

	addMouseUpgrade(value, upgrade) {
		if (this.nbrOwned >= value) {
			this.mouseUpgrades += upgrade
			document.getElementById('mouseupgrades').innerHTML = 'Mouse Rating: ' + abbreviate((this.mouseUpgrades))
			document.getElementById('clickbutton').title = 'Click Me! (+' + abbreviate((1 * this.mouseUpgrades)) + ')'
			this.setNbrOwned(this.nbrOwned - value)
			main.update()
		}
	}

}
