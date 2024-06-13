let Load = {
  found: false,
  data: {},
  stopLoading(){
    document.getElementById('loading').style.display = 'none'
  }
}

setTimeout(Load.stopLoading, 500) 