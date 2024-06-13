import { useContext } from 'react'
import { UserContext } from '@/context/UserProvider';
import PlugConnect from "@psychedelic/plug-connect"


const PlugWalletConnectButton = () => {
    const { user, setUser } = useContext(UserContext)

    const onConnect = async () => {
        try {
           
            // @ts-ignore: Property 'ic' does not exist on type 'Window & typeof globalThis'.
            const principal = await window.ic.plug.agent.getPrincipal();
            if (principal._isPrincipal) {
                setUser({ ...user, principal_id: principal.toString() })
            }
        } catch (error) {
            alert('Failed to get Principal ID');
        }
    }

    return (
        <>
            {!user.principal_id
                ?
                <PlugConnect
                    dark
                    whitelist={['icdu6-uaaaa-aaaai-qpfaa-cai']}
                    onConnectCallback={onConnect}
                    title='Connect'
                />

                :
                <button
                    className='c-ipvTzC c-ipvTzC-kyyahF-dark-true'
                    onClick={() => setUser({ ...user, principal_id: "" })}
                >
                    <div>
                        <img className='rotate-180' src="data:image/svg+xml,%3Csvg%20width%3D%2218%22%20height%3D%2227%22%20viewBox%3D%220%200%2018%2027%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url%28%23clip0%29%22%3E%3Cpath%20d%3D%22M3.36569%200.413793C3.36569%200.185261%203.54471%200%203.76554%200H5.59153C5.81236%200%205.99138%200.185261%205.99138%200.413793V6.66207H3.36569V0.413793Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M11.9488%200.413793C11.9488%200.185261%2012.1278%200%2012.3487%200H14.1747C14.3955%200%2014.5745%200.185261%2014.5745%200.413793V6.66207H11.9488V0.413793Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M0%207.75317C0%207.15214%200.470772%206.66498%201.0515%206.66498H16.9423C17.523%206.66498%2017.9938%207.15214%2017.9938%207.75317V13.1735C17.9938%2018.3157%2013.9658%2022.4841%208.99687%2022.4841C4.02805%2022.4841%200%2018.3157%200%2013.1735V7.75317Z%22%20fill%3D%22url%28%23paint0_linear%29%22%2F%3E%3Cpath%20d%3D%22M5.9934%2021.6952H12.0001V22.4706C12.0001%2023.5974%2011.1174%2024.5108%2010.0285%2024.5108H7.96497C6.8761%2024.5108%205.9934%2023.5974%205.9934%2022.4706V21.6952Z%22%20fill%3D%22url%28%23paint1_linear%29%22%2F%3E%3Cpath%20d%3D%22M6.96617%2024.1844H11.0276V25.6399C11.0276%2026.3911%2010.4392%2027.0001%209.71322%2027.0001H8.28055C7.55469%2027.0001%206.96617%2026.3911%206.96617%2025.6399V24.1844Z%22%20fill%3D%22url%28%23paint2_linear%29%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M17.2814%2016.8107C15.8952%2011.574%2011.2636%207.72583%205.76353%207.72583C3.67346%207.72583%201.70881%208.28155%200%209.25797V13.1734C0%2017.2256%202.50147%2020.6732%205.99355%2021.9527V22.4705C5.99355%2023.22%206.38414%2023.8752%206.96615%2024.2298V25.6397C6.96615%2026.3909%207.55467%2026.9999%208.28053%2026.9999H9.7132C10.4391%2026.9999%2011.0276%2026.3909%2011.0276%2025.6397V24.2298C11.6096%2023.8752%2012.0002%2023.22%2012.0002%2022.4705V21.9527C14.3801%2021.0807%2016.3%2019.2017%2017.2814%2016.8107Z%22%20fill%3D%22url%28%23paint3_linear%29%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.1303%2019.9854C14.6896%2014.7392%2010.4347%2010.6232%205.25093%2010.6232C3.32256%2010.6232%201.52274%2011.1928%200%2012.1783V13.1736C0%2017.2258%202.50147%2020.6734%205.99355%2021.9528V22.4706C5.99355%2023.2201%206.38414%2023.8753%206.96615%2024.23V25.6399C6.96615%2026.3911%207.55467%2027.0001%208.28053%2027.0001H9.7132C10.4391%2027.0001%2011.0276%2026.3911%2011.0276%2025.6399V24.23C11.6096%2023.8753%2012.0002%2023.2201%2012.0002%2022.4706V21.9528C13.1748%2021.5225%2014.2373%2020.8468%2015.1303%2019.9854Z%22%20fill%3D%22url%28%23paint4_linear%29%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.01%2021.951C11.8232%2017.6755%208.41456%2014.2686%204.23699%2014.2686C2.78504%2014.2686%201.42596%2014.6801%200.262758%2015.3967C0.986029%2018.452%203.16642%2020.9153%205.99825%2021.9528V22.4706C5.99825%2023.2201%206.38885%2023.8753%206.97089%2024.23V25.6399C6.97089%2026.3911%207.55934%2027.0001%208.28528%2027.0001H9.71795C10.4439%2027.0001%2011.0323%2026.3911%2011.0323%2025.6399V24.23C11.6144%2023.8753%2012.005%2023.2201%2012.005%2022.4706V21.9528C12.0066%2021.9522%2012.0084%2021.9516%2012.01%2021.951Z%22%20fill%3D%22url%28%23paint5_linear%29%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22paint0_linear%22%20x1%3D%2212.0068%22%20y1%3D%2212.5274%22%20x2%3D%2218.7021%22%20y2%3D%226.05116%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2346FF47%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%239CFF9D%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22paint1_linear%22%20x1%3D%2212.0067%22%20y1%3D%2212.5275%22%20x2%3D%2218.7019%22%20y2%3D%226.05118%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2346FF47%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%239CFF9D%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22paint2_linear%22%20x1%3D%2212.0068%22%20y1%3D%2212.5276%22%20x2%3D%2218.7021%22%20y2%3D%226.05128%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2346FF47%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%239CFF9D%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22paint3_linear%22%20x1%3D%2210.4427%22%20y1%3D%2213.8127%22%20x2%3D%2213.7708%22%20y2%3D%229.54251%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2310D9ED%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2310D9ED%22%20stop-opacity%3D%220.3%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22paint4_linear%22%20x1%3D%229.73293%22%20y1%3D%2215.3703%22%20x2%3D%2212.0141%22%20y2%3D%2211.1224%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23FA51D3%22%2F%3E%3Cstop%20offset%3D%220.958774%22%20stop-color%3D%22%23FA51D3%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22paint5_linear%22%20x1%3D%226.74918%22%20y1%3D%2221.7089%22%20x2%3D%2210.1797%22%20y2%3D%2213.233%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23FFE700%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23FFE700%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%22clip0%22%3E%3Crect%20width%3D%2218%22%20height%3D%2227%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="Plug logo" />
                        <span className='text-sm'>
                            {/* Disconnect: {user?.principal_id.substring(0, 3)}....{user?.principal_id.substring(user?.principal_id.length - 3, user?.principal_id.length)} */}
                            Disconnect
                        </span>
                    </div>
                </button>

            }
        </>
    )
}

export default PlugWalletConnectButton
