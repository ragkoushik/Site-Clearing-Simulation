import { connect } from "react-redux";
import '../css/Simulator.css'
import { facingAngle } from '../utils/constants';

function Bulldozer(props: any) {
    const transform = {
        transform: `scaleX(-1) rotate(${facingAngle[props.bulldozer.facing]}deg)`
    };
    return (
        <div>
            <img style={transform} alt="bulldozer" width="50" src="https://www.iconshock.com/image/RealVista/Construction/bulldozer" />
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        bulldozer: state.bulldozer
    };
  };
  
  export default connect(
    mapStateToProps
  )(Bulldozer);