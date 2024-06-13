let Animations = {
  currentAnimation:'Animation1',
  animationNames: ['Animation1', 'Animation2'],

  onload(){
    if ((Load.found == true)&&('animationsdata' in Load.data)){
      this.currentAnimation = Load.data.animationsdata.currentAnimation
    } else {
      currentAnimation = 'Animation1'
    }
  },

  Animation1: {
    animation: [
    '\
   \n\
    o\n\
   /|\\\n\
   / \\',
    
    '\
   \n\
    o\n\
    |\n\
   <<',
    
    '\
   \n\
    o\n\
    |\\\n\
   /<',
    
    '\
   \n\
    o\n\
    |\n\
   <<',
    
    '\
    o\n\
   /|\\\n\
   / \\\n\
    ',
    
    '\
   \n\
    o\n\
    |\n\
    >>',
     
    '\
   \n\
    o\n\
   /|\n\
    >\\',
     
    '\
   \n\
    o\n\
    |\n\
    >>',
    
    '\
    o\n\
   /|\\\n\
   / \\\n\
    ',
    
    '\
   \n\
    o\n\
    |\n\
   ((',
    
    '\
   \\\n\
    o\n\
    |\\\n\
   /(',
    
    '\
    o\n\
    |\n\
    ))\n\
    ',
     
    '\
  \n\
    o\n\
    |\n\
    ))',
     
    ' \
     /\n\
    o\n\
   /|\n\
    )\\',
     
    '\
    o\n\
   /|\\\n\
   / \\\n\
    ',
    `\
   \n\
     o\n\
    /|\\\n\
    / \\`,
  
    `\
     o\n\
    /|\\\n\
    / \\\n\
    `,

    `\
   \n\
     o\n\
    /|\\\n\
    / \\`,

    `\
   \n\
    o--^
     v\n\
  `,

    `\
     <\n\
    \\|/\n\
     o\n\
  `,

    `\
   \n\
     \\\n\
   v--o\n\
  `,


    `\
   \n\
    o\n\
   /|\n\
    |`
    
    ],
    name: 'Get Sturdy'
  },

  Animation2: {
    animation: [
    `\
  \n\
    o\n\
   /|\\\n\
   / \\`,
  
    `\
    o\n\
   /|\\\n\
   / \\\n\
    `,

    `\
  \n\
    o\n\
   /|\\\n\
   / \\`,

    `\
  \n\
   o--^
    v\n\
  `,

    `\
    <\n\
   \\|/\n\
    o\n\
  `,

    `\
  \n\
    \\\n\
  v--o\n\
  `,


    `\
  \n\
   o\n\
  /|\n\
   |`

  ],
    name: 'Backflip'
  }
}
