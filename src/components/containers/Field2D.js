import React from 'react';
import * as d3 from 'd3';
import soccerFieldUrl from '../../assets/soccer-field.png';
import tshirtBlueImgUrl from '../../assets/tshirt-blue.png';
import tshirtBlueDarkImgUrl from '../../assets/tshirt-blue-dark.png';
import tshirtRedImgUrl from '../../assets/tshirt-red.png';
import tshirtRedDarkImgUrl from '../../assets/tshirt-red-dark.png';

require('./field2D.scss');

export default class Field2D extends React.Component {
    static defaultProps = {
        onPlayerClick: () => {},
        field: { width: 600, height: 390, textureUrl: soccerFieldUrl }
    }

    svgRef = React.createRef();

    componentDidMount() { this.draw(); }

    componentDidUpdate() { this.draw(); }

    render() {
        const { field, perspective } = this.props;

        return (
            <div style={{width: `${field.width}px`, height: `${field.height}px`, left:'0px', position:'relative'}}>
                <img
                alt="campo de futbol"
                width={field.width}
                height={field.height}
                style={perspective === 'true' ? {transform: `perspective(${field.width}px) rotateX(45deg)`, position: 'absolute'} : {position: 'absolute'}}
                src={field.textureUrl} />
                <svg ref={this.svgRef}></svg>
            </div>
        );
    }

    draw = () => {
        const { field, homeTeam, awayTeam } = this.props;
        const svg = d3.select(this.svgRef.current);
        svg.selectAll("*").remove() 
        svg.attr({ viewBox: `0 0 ${field.width} ${field.height}`, id: 'svg-names' });

        this.drawShadowFilter(svg);
        if (homeTeam) this.drawHomePlayers(svg, homeTeam);
        if (awayTeam) this.drawAwaysPlayers(svg, awayTeam);
    }

    drawShadowFilter(svg) {
        let defs = svg.append("defs");
        let filter = defs.append("filter")
            .attr("id", "dropshadow")
        filter.append("feGaussianBlur")
          .attr("in", "SourceAlpha")
          .attr("stdDeviation", 4)
          .attr("result", "blur");
        filter.append("feOffset")
          .attr("in", "blur")
          .attr("dx", 0)
          .attr("dy", 0)
          .attr("result", "offsetBlur");
        let feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in", "offsetBlur")
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");
    }

    drawHomePlayers(svg, homeTeam) {
        const { homePlayerXCoord, homePlayerYCoord } = this.getHomePlayerCoordFns(svg);
        const { playerPositionById, players } = homeTeam;
        
        this.drawPlayers(
            svg,
            this.getTeamAligmentWithPlayers(playerPositionById, players),
            tshirtBlueImgUrl,
            tshirtBlueDarkImgUrl,
            homePlayerXCoord,
            homePlayerYCoord
        );
    }

    drawAwaysPlayers(svg, awayTeam) {
        const { homePlayerXCoord, homePlayerYCoord } = this.getAwayPlayerCoordFns(svg);
        const { playerPositionById, players } = awayTeam;

        this.drawPlayers(
            svg,
            this.getTeamAligmentWithPlayers(playerPositionById, players),
            tshirtRedImgUrl,
            tshirtRedDarkImgUrl,
            homePlayerXCoord,
            homePlayerYCoord
        );
    }

    getHomePlayerCoordFns(svg) {
        let svgWidth = this.props.field.width;
        let svgHeight = this.props.field.height / 1.3;
        let perspective = this.props.perspective || true;
        let halfSvgWidth = svgWidth / 2;
        let widthStep1 = halfSvgWidth / this.props.homeTeam.playerPositionById.length;
        let heightSteps1 = this.props.homeTeam.playerPositionById.map((elem) => parseInt(svgHeight / (elem.length)));

        let homePlayerXCoord = (playerData, i, j) => {
            if (perspective === 'true') {
                return (j * widthStep1 + svgWidth / 15) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (svgHeight / 3.6));
            }
            return (j * widthStep1);
        };

        let homePlayerYCoord = (playerData, i, j) => (i * heightSteps1[j]) + heightSteps1[j] / 2;

        return { homePlayerXCoord, homePlayerYCoord };
    }

    getAwayPlayerCoordFns() {
        let svgWidth = this.props.field.width;
        let svgHeight = this.props.field.height / 1.3;
        let perspective = this.props.perspective || true;
        let halfSvgWidth = svgWidth / 2;
        let widthStep2 = halfSvgWidth / this.props.awayTeam.playerPositionById.length;
        let heightSteps2 = this.props.awayTeam.playerPositionById.map((elem) => parseInt(svgHeight / (elem.length)));
        const originX = svgWidth - this.getPlayerTshirtWidth() - 2 * this.getPlayerTshirtXOffset();
        
        let homePlayerXCoord = (playerData, i, j) => {
            if (perspective === 'true') {
                return (svgWidth - j * widthStep2 - svgWidth / 12) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * (svgHeight / 2.2));
            }
            return (originX - j * widthStep2);
        };
        let homePlayerYCoord = (playerData, i, j) => (i * heightSteps2[j]) + heightSteps2[j] / 2;

        return { homePlayerXCoord, homePlayerYCoord };
    }

    drawPlayers(svg, players, tShirtUrl, tShirtDarkUrl, playerXCoord, playerYCoord) {
        let playerLabelXCoord = (playerData, i, j) => playerXCoord(playerData, i, j) + this.getRelativeWidth(20);
        let playerLabelYCoord = (playerData, i, j) =>  playerYCoord(playerData, i, j) + this.getRelativeHeight(90);

        let homeGroup = svg.append('g');
        homeGroup.selectAll('image')
            .data(players)
            .enter()
            .append('g')
            .selectAll('image')
            .data((idList) => idList)
            .enter()
            .append('image')
            .attr('xlink:href', playerData => playerData ? tShirtUrl : tShirtDarkUrl)
            .attr({
                x: playerXCoord,
                y: playerYCoord,
                width: `${this.getPlayerTshirtWidth()}px`,
                height: `${this.getPlayerTshirtHeight()}px`,
                transform: `translate(${this.getPlayerTshirtXOffset()}, ${this.getPlayerTshirtYOffset()})`,
                class: 'SSUI-Field2D-Image',
                filter: 'url(#dropshadow)'
            })
            .on('click', (player, i, j) => this.props.onPlayerClick(player, j ,i));

        let tmpBg = homeGroup.selectAll('rect')
            .data(players)
            .enter()
            .append('g')
            .selectAll('rect')
            .data((idList) => idList)
            .enter();

        let tmpTxt = homeGroup.selectAll('text')
            .data(players.filter(player => player))
            .enter()
            .append('g')
            .selectAll('text')
            .data((idList) => idList)
            .enter();

            
        tmpBg
            .append('rect')
            .attr({
                fill: 'rgba(0,0,0,0.75)',
                x: playerLabelXCoord,
                y: playerLabelYCoord,
                width: (player) => this.getPlayerName(player).length * this.getRelativeWidth(7),
                height: this.getRelativeHeight(20),
            });
        tmpTxt
            .append('text')
            .text(this.getPlayerName)
            .attr({
                fill: 'white',
                x: playerLabelXCoord,
                y: playerLabelYCoord,
                'font-size': this.getRelativeWidth(12),
                transform: `translate(${this.getRelativeWidth(5)}, ${this.getRelativeHeight(14)})`
            });

        tmpBg
            .append('rect')
            .attr({
                fill: '#eee',
                x: playerLabelXCoord,
                y: playerLabelYCoord,
                width: this.getRelativeWidth(20),
                height: this.getRelativeHeight(20),
                transform: `translate(${-10}, ${0})`
            });

        tmpTxt
            .append('text')
            .text(this.getPlayerNumber)
            .attr({
                fill: 'black',
                x: playerLabelXCoord,
                y: playerLabelYCoord,
                'font-size': this.getRelativeWidth(14),
                transform: (player) => `translate(${this.getRelativeWidth(parseInt(this.getPlayerNumber(player)) < 10 ? -12 : -14)}, ${this.getRelativeHeight(15)})`
            });
    }

    getPlayerTshirtWidth() {
        return this.getRelativeWidth(60);
    }

    getPlayerTshirtHeight() {
        return this.getRelativeHeight(60);
    }

    getPlayerTshirtXOffset() {
        return this.getRelativeWidth(10);
    }

    getPlayerTshirtYOffset() {
        return this.getRelativeHeight(35);
    }

    getRelativeWidth (width) {
        // all original measure where calculated with a field width of 1200;
        return width * this.props.field.width / 980;
    }

    getRelativeHeight (height) {
        return height * this.props.field.height / 620;
    }

    getTeamAligmentWithPlayers (teamAlignment, players) {
        return teamAlignment.map(
            idList => idList.map(
                id => this.getPlayerById(id, players)
            )
        )
    }

    getPlayerById = (playerId, players) => {
        return players.find(player => player.id === playerId);
    }

    getPlayerName(player) {
        return player ? player.name : 'Disponible'
    }

    getPlayerNumber(player) {
        return player ? player.playerNumber : 0;
    }
}