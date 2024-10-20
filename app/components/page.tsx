import WineSelectorGame from "./games/thisorthat/page";
import SweetnessBitternessSlider from "./games/slider/page";

export default function Games(){
    return(
        <div>
        <>
            <SweetnessBitternessSlider></SweetnessBitternessSlider>
            <WineSelectorGame></WineSelectorGame>
        </>
        </div>
    )
}