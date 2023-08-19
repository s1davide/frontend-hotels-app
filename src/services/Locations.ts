type DepartmentData = { [key: string]: string }
const departments: DepartmentData = {};
fetch("https://www.datos.gov.co/resource/xdk5-pm3f.json")
    .then((res) => res.json())
    .then((data) => {
        console.log(data.length);
        // data.forEach((v) => {
        //   departments[v.c_digo_dane_del_departamento] = v.departamento;
        // });

        const sortedDepartments = Object.values(departments).sort();

        sortedDepartments.forEach((department) => {
            console.log(department);
        });
    })
;("https://www.datos.gov.co/resource/xdk5-pm3f.json?$query=SELECT%0A%20%20%60region%60%2C%0A%20%20%60c_digo_dane_del_departamento%60%2C%0A%20%20%60departamento%60%2C%0A%20%20%60c_digo_dane_del_municipio%60%2C%0A%20%20%60municipio%60%0AORDER%20BY%20%60%3Aid%60%20ASC%20NULL%20LAST%0ASEARCH%20%2276%22%0ALIMIT%20100%0AOFFSET%200&");
