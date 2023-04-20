export default class HomeItem {
    private label: string;
    private icon: JSX.Element;
    private url: string;

    constructor(label: string, icon: JSX.Element, url: string) {
        this.label = label;
        this.icon = icon;
        this.url = url;
    }

    public getLabel () {return this.label;}
    public getIcon () {return this.icon;}
    public getUrl () {return this.url;}
}