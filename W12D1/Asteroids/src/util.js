const Util = {

    inherits(ChildClass, ParentClass) {
        ChildClass.prototype = Object.create(ParentClass.prototype);
        ChildClass.prototype.constructor = ChildClass;
    },
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    },  
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];        
    },
    wrap(xory, max) {
        if (xory < 0 ) {
            return max - (xory % max);
        } else if (xory > max) {
            return xory % max;
        } else {
           return xory;
        }
    }
};

module.exports = Util;