import Button from './Button';
import UI from './UI';

export default class Toggle extends Button
{

    constructor (...args)
    {
        super(...args);
        this.setColor('#ff0000');
        this.val = false;
    }

    click ()
    {
        super.click();

        this.val = !this.val;

        if(this.val)
        {
            this.setColor('#00ff00');
        }
        else
        {
            this.setColor('#ff0000');
        }
    }

    hover ()
    {
        this.scene.gameCanvas.style.cursor = 'pointer';
        this.setScale(1.1, 1.1);
        super.hover();
    }
    
    out ()
    {
        this.scene.pointer.switchCursor();
        this.setScale(1, 1);
        super.out();
    }

}
