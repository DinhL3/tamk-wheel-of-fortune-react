# Embedded Wheel of Fortune, frontend

![Overview](https://res.cloudinary.com/doeoghxhd/image/upload/v1718203321/wheel/overview_gxw7y0.png)

## 1. Overview
This is the frontend for the TAMK's embedded Wheel of Fortune project. Written in React TypeScript. The wheel can be choose a winner on its own on web interface, or change the mode to fetch the wheel position from the embedded wheel. User can add and remove players.

## 2. Installation and usage
* Clone this repo, `cd` into the repo
* Run `npm install`
* Run `npm start`

### 2.1. Web-only mode
* Check that the switch on the top-right of the wheel is on "Web only"
* The web-only mode should be functional, open `src/store/players-context.tsx` and change the number 10 in <br> `const [players, setPlayers] = useState<Player[]>(generatePlayers(10));` <br>
to adjust the amount of initial random players, to see how the wheel segments change. Fewer than 4 players not supported (see Missing features below).
* Click the Spin button in the middle to spin the wheel. The wheel should stop at a random player after 4 seconds. Winner is announced in browser's console.

### 2.2. Embedded mode
* Check that the wiring for Raspberry Pi (Websocket server), Arduino, and the codes for respective parts are working properly. <br>
Arduino C++: https://github.com/DinhL3/Laser_sensor <br>
Raspberry Pi Python: https://github.com/DinhL3/wheel-python <br>
* Make sure both client and Websocket server are on the same network, and get the **LOCAL** IPv4 address of the server. Please don't use public IP address from https://whatismyipaddress.com/ :(
* Disable firewall on Websocket server device (not recommended but we could not find another solution), and check if there is connection by running `ping <server-ipv4-address>` in client's Command Prompt
* Open `src/components/Wheel/Wheel.tsx` <br>
and change accordingly `ws.current = new WebSocket('ws://<server-ipv4>:<port>');`
* Open browser and switch to Embedded mode, check console if there is successful connection to websocket
* If connection successful, embedded mode should be working. Spin the physical wheel and see the web wheel reflect its position
* Press the reset button in the middle to reset both web and Arduino wheel position via Websocket.

## 3. Missing features and suggestions
* Wheel does not work with fewer than 4 players. Suggestion: Make 3 more conditional wheels for 0-3 players. 0 and 1 should be one whole circle. For 2 and 3, make use of the rotation degree, transform-origin, and trigonometry calculation for clip-path to make the segments. <br>
[clip-path maker](https://bennettfeely.com/clippy/)
* Modal pop-up to announce the winner.
