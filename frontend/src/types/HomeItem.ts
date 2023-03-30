import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default class HomeItem {
    private label: string;
    private icon: IconDefinition;
    private url: string;

    constructor(label: string, icon: IconDefinition, url: string) {
        this.label = label;
        this.icon = icon;
        this.url = url;
    }

    public getLabel () {return this.label;}
    public getIcon () {return this.icon;}
    public getUrl () {return this.url;}
}