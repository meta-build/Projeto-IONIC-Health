export default class DropdownItem {
    private label: string;
    private icon: JSX.Element;

    constructor(label: string, icon: JSX.Element) {
        this.label = label;
        this.icon = icon;
    }

    public getLabel () {return this.label;}
    public getIcon () {return this.icon;}
}