import React, { useContext, useEffect, useState } from "react";
import { InitContext } from "../../App";
import FormPage from "./FormPage";
import CreateLoading from "./CreateLoading";


// 中轉頁面
function CreatePage() {
    const [page, SetPage] = useState(null);
    const context_val = useContext(InitContext);   
    useEffect(() => {     
        if (context_val.page == 0)
            SetPage(<FormPage />)
        else if (context_val.page == 1)
            SetPage(<CreateLoading />)
        
    }, [context_val.page])


    return (
        <div>
            { page }
        </div>
    );
}

export default CreatePage;