export default {
    getOptionsOfSelector_1: function() {
        let vueThis = this;
        vueThis.$get(
            "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZX_ByGZMBLX",
            { strGZMBMC: vueThis.gzmbmc },
            data => {
                vueThis.optionsOfSelector_1 = data;
            }
        );
    }
}
// export function getOptionsOfSelector_1() {
//     let vueThis = this;
//     vueThis.$get(
//         "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZX_ByGZMBLX",
//         { strGZMBMC: vueThis.gzmbmc },
//         data => {
//             vueThis.optionsOfSelector_1 = data;
//         }
//     );
// }