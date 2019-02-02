import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
require('./field2D.scss');

export default class Field2D extends React.Component {

    state = {
        windowWidth: window.innerWidth
    }

    handleResize = (e) => {
        this.setState({
            windowWidth: window.innerWidth
        });
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize);
        this.draw();
    }

    render() {
        let field = <img
                id="SSUI-Field2D-FieldTexture"
                alt="campo de futbol"
                width={this.props.field.width}
                height={this.props.field.hright}
                style={this.props.perspective === 'true' ? {transform: 'perspective(' + this.props.field.width + 'px) rotateX(45deg)', position: 'absolute'} : {position: 'absolute'}}
                src={this.props.field.textureUrl} />

        return (
            <div id="SSUI-Field2D" style={{width: this.props.field.width + 'px', height:'auto', left:'0px', position:'relative'}}>
                {field}
            </div>
        );
    }

    draw = () => {
        let svg = d3.select(ReactDOM.findDOMNode(this)).append('svg');
        svg.attr({
            viewBox: '0 0 ' +  this.props.field.width + ' ' + this.props.field.height,
            id: 'svg-names'
        });

        this.drawShadowFilter(svg);
        this.drawHomePlayers(svg);
        this.drawAwaysPlayers(svg);
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

    drawHomePlayers(svg) {
        const { homePlayerXCoord, homePlayerYCoord } = this.getHomePlayerCoordFns(svg);
        const { playerPositionById, players } = this.props.homeTeam;
        
        this.drawPlayers(
            svg,
            this.getTeamAligmentWithPlayers(playerPositionById, players),
            homePlayerXCoord,
            homePlayerYCoord
        );
    }

    drawAwaysPlayers(svg) {
        const { homePlayerXCoord, homePlayerYCoord } = this.getAwayPlayerCoordFns(svg);
        const { playerPositionById, players } = this.props.awayTeam;

        this.drawPlayers(
            svg,
            this.getTeamAligmentWithPlayers(playerPositionById, players),
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

    drawPlayers(svg, players, playerXCoord, playerYCoord) {
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
            .attr('xlink:href', (playerData) => playerData.tShirtImgUrl)
            .attr({
                x: playerXCoord,
                y: playerYCoord,
                width: `${this.getPlayerTshirtWidth()}px`,
                height: `${this.getPlayerTshirtHeight()}px`,
                transform: `translate(${this.getPlayerTshirtXOffset()}, ${this.getPlayerTshirtYOffset()})`,
                class: 'SSUI-Field2D-Image',
                filter: 'url(#dropshadow)'
            })
            .on('click', (playerData, i, j) => this.props.onPlayerClick(playerData));

        let tmpBg = homeGroup.selectAll('rect')
            .data(players)
            .enter()
            .append('g')
            .selectAll('rect')
            .data((idList) => idList)
            .enter();

        let tmpTxt = homeGroup.selectAll('text')
            .data(players)
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
                width: (playerData) => (playerData.name).length * this.getRelativeWidth(7), // TODO
                height: this.getRelativeHeight(20),
            });
        tmpTxt
            .append('text')
            .text((playerData) => playerData.name)
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
            .text((playerData) => playerData.tShirtNr)
            .attr({
                fill: 'black',
                x: playerLabelXCoord,
                y: playerLabelYCoord,
                'font-size': this.getRelativeWidth(14),
                transform: (playerData) => `translate(${this.getRelativeWidth(parseInt(playerData.tShirtNr) < 10 ? -12 : -14)}, ${this.getRelativeHeight(15)})`
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
        return players.find(player => Number(player.id) === Number(playerId));
    }
}