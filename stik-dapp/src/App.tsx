import { useContext, useEffect, useState } from "react"
import PlugWalletConnectButton from "./components/PlugWalletConnectButton"
import { UserContext } from "./context/UserProvider"
import MintNftButton from "./components/MintNftButton"
import axios from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import ReactGA from "react-ga4";

const App = () => {
  const { user } = useContext(UserContext)
  const [taps, setTaps] = useState(0)
  const [balance, setBalance] = useState(0)
  const [loadingBalance, setLoadingBalance] = useState(true)
  const [refreshBalance, setRefreshBalance] = useState(false)

  useEffect(() => {
    ReactGA.initialize("G-HJV9KDW9CE");
  }, [])

  const loadBalance = () => {
    if (user.principal_id) {
      setLoadingBalance(true)
      axios.get(`${import.meta.env.VITE_ICP_SERVER_URL}/getBalance/${user.principal_id}`)
        .then(res => {
          if (typeof res.data.tokenbalance === typeof 123) {
            //setBalance(res.data.tokenbalance)
            let tokenBalanceStr = res.data.tokenbalance.toString();

            // Extract the last 8 digits for the fractional part
            let fractionalPart = tokenBalanceStr.slice(-8);

            // Extract the integer part by removing the last 8 digits
            let integerPart = tokenBalanceStr.slice(0, -8);

            // Combine the integer and fractional parts
            let combinedValue = parseInt(integerPart, 10) + parseInt(fractionalPart, 10) / 100000000;

            // Set the balance
            setBalance(combinedValue);

          }
          setLoadingBalance(false)
        })
        .catch(err => {
          console.log(err);
          setLoadingBalance(false)
          if (err.response.data.error) {
            alert(err.response.data.error)
            return
          }
          alert("Could not get your balance at the moment")
        })
    }
  }
  useEffect(() => {
    loadBalance()
  }, [user, refreshBalance])

  return (
    <section className="">
      <div id="loading">
        <div id="preloader">
          <svg viewBox="0 0 100 100">
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#C0C0C0" />
              </filter>
            </defs>
            <circle id="loading-spinner"
              style={{ fill: 'transparent', stroke: '#000000', strokeWidth: '7px', strokeLinecap: 'round', filter: 'url(#shadow)' }} cx="50"
              cy="50" r="45" />
          </svg>
        </div>
      </div>

      <div className="background-container">
        <div className="maingame">
          <img src="stik-logo.png" style={{ width: '300px' }} />
          <p className="basicbold"><a href="https://bj2ym-biaaa-aaaal-aji3q-cai.icp0.io/" target="_blank">about</a></p>
          <p className="small">Connect wallet, tap to earn!</p>

          <div className="flex justify-center my-4 gap-2 items-center">
            <PlugWalletConnectButton />
            {user.principal_id
              &&
              <MintNftButton taps={taps} setTaps={setTaps} setRefreshBalance={setRefreshBalance} />
            }
          </div>

          <span className="basic" style={{ display: 'none' }} title="Mouse Specs" id='mouseupgrades'>Mouse Rating: 1</span>
          <span className="basic" style={{ display: 'none' }} title="Lazy" id='cps'>0 cps</span>
          {user.principal_id
            &&
            <p className="basic flex items-center justify-center gap-2" style={{ margin: '7px 0px' }} title="Balance">
              Your Balance:
              <span id='balance'>
                {loadingBalance
                  ? <Loader2 className="animate-spin" />
                  :
                  <div className="flex gap-2">
                    {balance}
                    <button title="Refresh Balance" onClick={() => setRefreshBalance(!refreshBalance)}><RefreshCcw className="w-4 h-4" /></button>
                  </div>
                }
              </span>
            </p>
          }
          <p className="basic" style={{ margin: '7px 0px' }} title="Faster!">Run Time: <span id='currentrun'>0:0:0:0.0</span></p>
          <p className="basic" style={{ margin: '7px 0px' }} title="'Finger Workout'" id='clicks'></p>

          <pre id='animation'
            style={{ margin: '10px 0 !important', width: '300px', fontSize: '60px', background: 'lightgrey', textShadow: '2px 2px #ffffff' }}
            title="Watch Me Dance!"></pre>
          <p className='aftergame'>
            <button id='clickbutton' style={{ width: '300px', height: '200px', fontFamily: 'monospace', fontSize: '60px' }}
              onClick={() => {
                // @ts-ignore
                Clicks.addClick()

                setTaps(prev => prev + 1)

                const elem = document.getElementById('clickbutton')

                // @ts-ignore
                colorizeString(elem);
              }}
            >
              Tap Me
            </button>
          </p>

        </div>
      </div>

      <div id="resetModal" className="modal">
        <div className="modal-content">
          <span onClick={() => {
            // @ts-ignore
            Reset.changeResetModalStatus('none')
          }}
            className="close"
          >
            &times;
          </span>
          <div className="basic" style={{ margin: "0px" }}>
            Do you really want to reset your game?<br />
            All save data will be lost.<br />
            <br />
            <button onClick={() => {
              // @ts-ignore
              Reset.reset()
            }}
            >
              Yes
            </button>
            <button onClick={() => {
              // @ts-ignore
              Reset.noReset()
            }}
              style={{ margin: "0px 20px" }}
            >
              No
            </button>
          </div>
        </div>
      </div>


    </section>
  )
}

export default App