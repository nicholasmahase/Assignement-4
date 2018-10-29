//Global variables
$(document).ready(function() {

    //audio clips
    var audio = new Audio('assets/audio/imperial_march.mp3');
    var hitSound = new Audio('assets/mortal kombat audio/hitsounds/mk1-00048.mp3');
    var quack = new Audio('assets/mortal kombat audio/unused/mk1-quack.mp3');
    var cheer = new Audio('assets/mortal kombat audio/arenas/mk1-00321.mp3');
    var lostLaugh = new Audio('assets/mortal kombat audio/announcer/mk1-00379.mp3');
    var testYourMight = new Audio('assets/mortal kombat audio/announcer/mk1-00381.mp3');
    
    //Array of Playable Fighters
    var fighters = {
        'Shao Khan': {
            name: 'Shao Khan',
            health: 90,
            attack: 8,
            imageUrl: "assets/images/shao_khan.png",
            enemyAttackBack: 20
        }, 
          'Goro': {
            name: 'Goro',
            health: 100,
            attack: 8,
            imageUrl: "assets/images/goro.png",
            enemyAttackBack: 20
        }, 
        'Jade': {
            name: 'Jade',
            health: 110,
            attack: 7,
            imageUrl: "assets/images/jade.png",
            enemyAttackBack: 20
        },
        'Jax': {
            name: 'Jax',
            health: 115,
            attack: 7,
            imageUrl: "assets/images/jax.png",
            enemyAttackBack: 20
        },
        'Kitana': {
            name: 'Kitana',
            health: 120,
            attack: 7,
            imageUrl: "assets/images/kitana.png",
            enemyAttackBack: 20
        },
        'Kung Lao': {
            name: 'Kung Lao',
            health: 125,
            attack: 7,
            imageUrl: "assets/images/kung_lao.png",
            enemyAttackBack: 20
        },
        'Liu Kang': {
            name: 'Liu Kang',
            health: 130,
            attack: 7,
            imageUrl: "assets/images/liu_kang.png",
            enemyAttackBack: 20
        },
        'Mileena': {
            name: 'Mileena',
            health: 135,
            attack: 7,
            imageUrl: "assets/images/mileena.png",
            enemyAttackBack: 20
        },
        'Scorpion': {
            name: 'Scorpion',
            health: 140,
            attack: 7,
            imageUrl: "assets/images/Scorpion.png",
            enemyAttackBack: 20
        },
        'Shang Tsung': {
            name: 'Shang Tsung',
            health: 150,
            attack: 7,
            imageUrl: "assets/images/shang_tsung.png",
            enemyAttackBack: 20
        },
        'Sonya': {
            name: 'Sonya',
            health: 155,
            attack: 7,
            imageUrl: "assets/images/sonya.png",
            enemyAttackBack: 20
        },
        'Sub Zero': {
            name: 'Sub Zero',
            health: 160,
            attack: 7,
            imageUrl: "assets/images/subzero.png",
            enemyAttackBack: 20
        },
        'Johnny Cage': {
            name: 'Johnny Cage',
            health: 80,
            attack: 7,
            imageUrl: "assets/images/johnny_cage.png",
            enemyAttackBack: 20
        },
        'Kabal': {
            name: 'Kabal',
            health: 85,
            attack: 7,
            imageUrl: "assets/images/Kabal.png",
            enemyAttackBack: 20
        },
        'Raiden': {
            name: 'Raiden',
            health: 175,
            attack: 7,
            imageUrl: "assets/images/raiden.png",
            enemyAttackBack: 20
        }
        
    };
    
    var myPlayer;
    var myOpponent;
    var combatants = [];
    var indexofSelChar;
    var attackResult;
    var turnCounter = 1;
    var killCount = 0;
    var combatants1 = "";
    
    
    var renderOne = function(character, fighterArea, makeChar) {
        //character: obj, fighterArea: class/id, makeChar: string
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(fighterArea).append(charDiv);
        //Capitalizes the first letter in fighters name
        // $('.character').css('textTransform', 'capitalize');
        // conditional render
        if (makeChar === 'enemy') {
          $(charDiv).addClass('enemy');
        } else if (makeChar === 'oppChar') {
          myOpponent = character;
          $(charDiv).addClass('target-enemy');
        }
      };
    
      // Create function to render game message to DOM
      var renderMessage = function(message) {
        var gameMesageSet = $("#gameMessage");
        var newMessage = $("<div>").text(message);
        gameMesageSet.append(newMessage);
    
        if (message === 'clearMessage') {
          gameMesageSet.text('');
        }
      };
    
      var renderFighters = function(charObj, areaRender) {
        //render all fighters
        if (areaRender === '#characters-section') {
          $(areaRender).empty();
          for (var key in charObj) {
            if (charObj.hasOwnProperty(key)) {
              renderOne(charObj[key], areaRender, '');
            }
          }
        }
        //render player character
        if (areaRender == '#selected-character') {
          $('#selected-character').prepend("Your Character");       
          renderOne(charObj, areaRender, '');
          $('#attack-button').css('visibility', 'visible');
          $('#random-button').css('visibility', 'visible');
        }
        //render combatants
        if (areaRender == '#available-to-attack-section') {
            $('#available-to-attack-section').prepend("Choose Your Next Opponent");      
          for (var i = 0; i < charObj.length; i++) {
    
            renderOne(charObj[i], areaRender, 'enemy');
          }
          //render one enemy to oppChar area
          $(document).on('click', '.enemy', function() {
            //select an combatant to fight
            name = ($(this).data('name'));
            //if oppChar area is empty
            if ($('#oppChar').children().length === 0) {
              renderFighters(name, '#oppChar');
              $(this).hide();
              renderMessage("clearMessage");
            }
          });
        }
        //render oppChar
        if (areaRender == '#oppChar') {
          $(areaRender).empty();
          for (var i = 0; i < combatants.length; i++) {
            //add enemy to oppChar area
            if (combatants[i].name == charObj) {
              $('#oppChar').append("Your selected opponent")
              renderOne(combatants[i], areaRender, 'oppChar');
            }
          }
        }
        //re-render oppChar when attacked
        if (areaRender == 'playerDamage') {
          $('#oppChar').empty();
          $('#oppChar').append("Your selected opponent");
          renderOne(charObj, '#oppChar', 'oppChar');

        }
        //re-render player character when attacked
        if (areaRender == 'enemyDamage') {
          $('#selected-character').empty();
          renderOne(charObj, '#selected-character', '');
        }
        //render defeated enemy
        if (areaRender == 'enemyDefeated') {
          $('#oppChar').empty();
          var gameStateMessage = "You have defeated " + charObj.name + ", you can choose to fight another enemy.";
          renderMessage(gameStateMessage);

        }
      };
      //this is to render all fighters for user to choose their computer
      renderFighters(fighters, '#characters-section');
      $(document).on('click', '.character', function() {
        name = $(this).data('name');
        //if no player char has been selected
        if (!myPlayer) {
          myPlayer = fighters[name];
          for (var key in fighters) {
            if (key != name) {
              combatants.push(fighters[key]);
            }
          }
          $("#characters-section").hide();
          renderFighters(myPlayer, '#selected-character');
          //this is to render all fighters for user to choose fight against
          renderFighters(combatants, '#available-to-attack-section');
        }
      });
      
      // ----------------------------------------------------------------
      // Create functions to enable actions between objects.
      $("#attack-button").on("click", function() {
        //if oppChar area has enemy
        if ($('#oppChar').children().length !== 0) {
          //oppChar state change
          var attackMessage = "You attacked " + myOpponent.name + " for " + (myPlayer.attack * turnCounter) + " damage.";
          hitSound.play();
          renderMessage("clearMessage");
          //combat
          myOpponent.health = myOpponent.health - (myPlayer.attack * turnCounter);
    
          //win condition
          if (myOpponent.health > 0) {
            //enemy not dead keep playing
            renderFighters(myOpponent, 'playerDamage');
            //player state change
            var counterAttackMessage = myOpponent.name + " attacked you back for " + myOpponent.enemyAttackBack + " damage.";
            renderMessage(attackMessage);
            renderMessage(counterAttackMessage);
    
            myPlayer.health = myPlayer.health - myOpponent.enemyAttackBack;
            renderFighters(myPlayer, 'enemyDamage');
            if (myPlayer.health <= 0) {
              renderMessage("clearMessage");
              restartGame("You have been defeated...GAME OVER!!!");
              lostLaugh.play();
              $("#attack-button").unbind("click");
            }
          } else {
            renderFighters(myOpponent, 'enemyDefeated');
            killCount++;
            if (killCount >= 5) {
              renderMessage("clearMessage");
              restartGame("You Won!!!! GAME OVER!!!");
              cheer.play(); 
            }
          }
          turnCounter++;
        } else {
          renderMessage("clearMessage");
          renderMessage("No enemy here.");
          quack.play();
        }
      });
    
    //Restarts the game - renders a reset button
      var restartGame = function(inputEndGame) {
        //When 'Restart' button is clicked, reload the page.
        var restart = $('<button class="btn">Restart</button>').click(function() {
          location.reload();
        });
        var gameState = $("<div>").text(inputEndGame);
        $("#gameMessage").append(gameState);
        $("#gameMessage").append(restart);
      };
       setTimeout(function() {
        testYourMight.play();
        }, 1000);
       
        $('#randomButton').on('click', function() {
          Game();
        });
        function Game() {
          //computer generates random word from words array
          
      
          //creating a loop to generate "_" for each letter in array stored in blanks
          for (var i = 0; i < combatants1.length; i++) {
            if (combatants1[i].name == charObj) {
              combatants1 = fighters[Math.floor(Math.random() * fighters.length)];
              $('#oppChar').append("Your selected opponent")
              renderOne(combatants1[i], areaRender, 'oppChar');
              return combatants1;
            }
          }
        }
    });