import "./CompanyTrademark.scss";

function CompanyTrademark() {
    return (
        <div className="trademark">
            <div className="trademark__logo">
                <h1 className='trademark__name'>Comms</h1>
                <img src="/src/assets/logo-500x500.png" alt="" className="trademark__img" />
            </div>
            <p className='trademark__heading'>Real time chatting has never been easier</p>
        </div>
    );
}

export default CompanyTrademark;