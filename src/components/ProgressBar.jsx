
export default function ProgressBar({ total, success, errors, asked }) {
    return (
        <div className="bar">
            <div className="asked-bar" style={{ width: `calc((${asked}/${total})*100%)` }}>
                <div className="successBar" style={{ width: `calc((${success}/${asked})*100%)` }}></div>
                <div className="errorsBar" style={{ width: `calc((${errors}/${asked})*100%)` }}></div>
            </div>
        </div>
    );
}