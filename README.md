[Ludum Dare Link](https://ldjam.com/events/ludum-dare/53/alea-ludum-dare)

# DISCLAIMER / WARNING :

**This entry doesn't work until Compo has finished.**

**It uses Ludum Dare API Calls that aren't available while Ludum Dare is ongoing. So, if you're trying this prior to the Compo's end it won't do anything.**

**It's also possible that Jam games might not be available through this entry until the Jam's end.**

**For this same reason, I couldn't test it in proper live conditions. While in theory it should be ok as it worked well in my testing environement, there's still a risk that things don't end up working properly.**

## Browser Extension / Script

The Alea Ludum Dare Browser Extension (and its script version) adds an "Alea" (Random) Filter/Sort option to the Ludum Dare website in addition to the usual filters like Smart, Classic, etc...

Once the Alea filter is selected, a random selection of games will be shown. The games can also be rerolled through the "Reroll" button (instead of the More button).

The Alea filter can also be used along 'Category' (Compo/Jam/Extra) filters. For that, you'll have to select a Category first and then switch the 'sorting' to Alea.

**Setup (Browser Extension version) :**  
*Browser extension works with Google Chrome or any other browser with a good Manifest V3 compatibility.*
*It is not compatible with Mozilla Firefox.*
- Download the browser extension
- Load the Extension in your browser
-- For Chrome : go to "chrome://extensions/" in the url -> enable Developer Mode -> click on Load unpacked -> select the extension's folder
-- Note : Extensions loaded that way are temporary extensions and will be removed once you close your browser (or if you remove it manually)
- Open the list of games page on LD's website (https://ldjam.com/games). *If you were already on it prior to loading the extension, you might have to refresh the page.*

**Setup (Script version) :**  
*Works with any browser.*
- Go to the list of games page on LD's website (https://ldjam.com/games)
- Open your browser's developer tools (usually F12 hotkey)
- Copy/paste the contents of alea_script.js into the console & Execute it.
- Click on the Sort Filter dropdown and you'll have the Alea Filter showing up.
*If you leave the page, you'll have to execute the script again for it to show back.*

**How to use :**
- On the list of games page, click on the Sort Filter dropdown (the one with Smart, Classic, etc... filters)
- Select the Alea Filter option and enjoy random games.

## Web Page

The Alea Ludum Dare web page offers another way to get random games from this Ludum Dare. It is simpler and doesn't need any kind of setup.

It's a very basic web page, with only category selection and a simple button that will deliver you a single random Ludum Dare game at once.

**How To Use :**
- Open the Alea Ludum Dare web page (https://axelvborn.github.io/AleaLudumDare/)
- Choose the category (All, Compo, Jam or Extra) you want to test games from.
- Click on the Da Ludum Alea button and a new tab will open with your random game.