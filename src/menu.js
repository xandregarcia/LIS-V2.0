export default [
    {label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'},
    {
        label:'Users', icon:'pi pi-fw pi-users',
        items:[
            {
                label:'List',icon:'pi pi-fw pi-users',to: '/users'                       
            },              
            {
                label:'New',icon:'pi pi-fw pi-user-plus',to: '/users/new'                  
            },
        ]
    }
]