using System;
using System.Collections.Generic;
using System.Text;

namespace VolcanoApi
{
    public class Location
    {
        public string Type { get; set; }
        public IEnumerable<double> Coordinates { get; set; }
    }
}
